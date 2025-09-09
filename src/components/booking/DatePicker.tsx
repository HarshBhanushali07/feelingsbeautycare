import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const DatePicker = ({ date, onDateSelect }: DatePickerProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable Sundays (0 = Sunday)
  const disabledDays = (date: Date) => {
    return date < today || date.getDay() === 0;
  };

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateSelect}
        disabled={disabledDays}
        initialFocus
        className={cn("glass-card rounded-md border-glass-border p-3 pointer-events-auto")}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-montserrat font-medium text-foreground",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 glass-card border-glass-border hover:bg-rose-gold/20 transition-colors"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] font-montserrat",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal font-montserrat hover:bg-rose-gold/20 hover:text-rose-gold transition-colors rounded-md"
          ),
          day_selected: "bg-rose-gold text-rose-gold-foreground hover:bg-rose-gold hover:text-rose-gold-foreground focus:bg-rose-gold focus:text-rose-gold-foreground",
          day_today: "bg-primary/10 text-primary font-semibold",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
};