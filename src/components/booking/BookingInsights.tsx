import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Calendar, Star, Award } from "lucide-react";

interface BookingInsightsProps {
  selectedDate?: Date;
  selectedTime?: string;
  serviceName?: string;
}

const BookingInsights = ({ selectedDate, selectedTime, serviceName }: BookingInsightsProps) => {
  // Mock data for insights
  const insights = {
    popularTimes: ["2:00 PM", "3:30 PM", "5:00 PM"],
    averageWaitTime: "5 minutes",
    todayBookings: 12,
    peakHours: "2:00 PM - 6:00 PM",
    customerRating: 4.9,
    completionRate: 98
  };

  const getDayOfWeek = () => {
    if (!selectedDate) return "";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[selectedDate.getDay()];
  };

  const getTimeInsight = () => {
    if (!selectedTime) return null;
    
    const hour = parseInt(selectedTime.split(":")[0]);
    const isPM = selectedTime.includes("PM");
    const time24 = isPM && hour !== 12 ? hour + 12 : hour;
    
    if (time24 >= 14 && time24 <= 18) {
      return {
        type: "peak",
        message: "Peak hours - Higher demand",
        icon: TrendingUp,
        color: "text-orange-500"
      };
    } else if (time24 >= 10 && time24 <= 12) {
      return {
        type: "optimal",
        message: "Optimal timing - Less crowded",
        icon: Star,
        color: "text-green-500"
      };
    } else {
      return {
        type: "quiet",
        message: "Quiet hours - More personalized",
        icon: Clock,
        color: "text-blue-500"
      };
    }
  };

  const timeInsight = getTimeInsight();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Award className="w-5 h-5 text-primary" />
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          Booking Insights
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Time Insight */}
        {timeInsight && (
          <div className="glass-card p-3 rounded-xl border border-glass-border">
            <div className="flex items-center space-x-2 mb-2">
              <timeInsight.icon className={`w-4 h-4 ${timeInsight.color}`} />
              <span className="text-xs font-montserrat font-medium text-foreground">
                Time Selection
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {timeInsight.message}
            </p>
          </div>
        )}

        {/* Day Popularity */}
        {selectedDate && (
          <div className="glass-card p-3 rounded-xl border border-glass-border">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-montserrat font-medium text-foreground">
                {getDayOfWeek()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {["Saturday", "Sunday"].includes(getDayOfWeek()) ? "Weekend - Popular day" : "Weekday - Good availability"}
            </p>
          </div>
        )}

        {/* Service Rating */}
        <div className="glass-card p-3 rounded-xl border border-glass-border">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-xs font-montserrat font-medium text-foreground">
              Service Rating
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-primary">{insights.customerRating}</span>
            <span className="text-xs text-muted-foreground">({insights.todayBookings} reviews)</span>
          </div>
        </div>

        {/* Average Wait */}
        <div className="glass-card p-3 rounded-xl border border-glass-border">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-montserrat font-medium text-foreground">
              Avg. Wait Time
            </span>
          </div>
          <p className="text-sm font-bold text-primary">{insights.averageWaitTime}</p>
        </div>
      </div>

      {/* Popular Times */}
      <div className="glass-card p-4 rounded-xl border border-glass-border">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-montserrat font-semibold text-foreground">
            Most Popular Times Today
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {insights.popularTimes.map((time, index) => (
            <Badge 
              key={index}
              className={`text-xs ${selectedTime === time 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
              }`}
            >
              {time}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quality Indicators */}
      <div className="glass-card p-4 rounded-xl border border-glass-border bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{insights.completionRate}%</div>
            <div className="text-xs text-muted-foreground font-montserrat">On-time completion</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{insights.todayBookings}</div>
            <div className="text-xs text-muted-foreground font-montserrat">Bookings today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInsights;