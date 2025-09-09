import { format, isSameDay } from "date-fns";

interface TimeSlotSelectorProps {
  timeSlots: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  selectedDate?: Date;
}

export const TimeSlotSelector = ({ timeSlots, selectedTime, onTimeSelect, selectedDate }: TimeSlotSelectorProps) => {
  const isToday = selectedDate ? isSameDay(selectedDate, new Date()) : false;
  const currentHour = new Date().getHours();
  
  const isSlotDisabled = (timeSlot: string) => {
    if (!isToday) return false;
    
    // Convert time slot to 24-hour format for comparison
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours;
    
    return hour24 <= currentHour;
  };

  return (
    <div className="space-y-4">
      {selectedDate && (
        <div className="text-center text-sm text-muted-foreground font-montserrat mb-4">
          Available slots for {format(selectedDate, 'EEEE, MMMM do')}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {timeSlots.map((timeSlot, index) => {
          const disabled = isSlotDisabled(timeSlot);
          const isSelected = selectedTime === timeSlot;
          
          return (
            <button
              key={timeSlot}
              type="button"
              onClick={() => !disabled && onTimeSelect(timeSlot)}
              disabled={disabled}
              className={`glass-card p-4 rounded-xl text-sm font-montserrat font-medium transition-all duration-300 transform hover:scale-105 min-h-[60px] flex flex-col items-center justify-center ${
                disabled
                  ? 'opacity-40 cursor-not-allowed text-muted-foreground'
                  : isSelected
                  ? 'border-rose-gold bg-rose-gold/20 text-rose-gold animate-glow shadow-lg scale-105'
                  : 'text-foreground hover:bg-rose-gold/10 hover:text-rose-gold hover:border-rose-gold/50 hover:shadow-md'
              }`}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className="text-base font-semibold">{timeSlot}</div>
              {disabled ? (
                <div className="text-xs text-muted-foreground mt-1">
                  Unavailable
                </div>
              ) : isSelected ? (
                <div className="text-xs text-rose-gold mt-1">
                  Selected ✓
                </div>
              ) : (
                <div className="text-xs text-muted-foreground mt-1">
                  Available
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-center text-xs text-muted-foreground font-montserrat">
        * Salon is closed on Sundays
      </div>
    </div>
  );
};