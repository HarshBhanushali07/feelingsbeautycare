import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Clock, User, Search, Filter, Trash2, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Booking {
  bookingId: string;
  service: {
    name: string;
    duration: string;
    price: number;
  };
  date: Date;
  time: string;
  name: string;
  phone: string;
  email: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings: Booking[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('booking_')) {
        try {
          const bookingData = JSON.parse(localStorage.getItem(key) || '{}');
          if (bookingData.bookingId) {
            allBookings.push({
              ...bookingData,
              date: new Date(bookingData.date),
              createdAt: new Date(bookingData.createdAt || Date.now()),
              status: bookingData.status || 'confirmed'
            });
          }
        } catch (error) {
          console.error('Error parsing booking data:', error);
        }
      }
    }
    
    // Sort by creation date (newest first)
    allBookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setBookings(allBookings);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      (booking.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.bookingId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.service?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map(booking => 
      booking.bookingId === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    );
    
    setBookings(updatedBookings);
    
    // Update in localStorage
    const bookingData = localStorage.getItem(`booking_${bookingId}`);
    if (bookingData) {
      const parsed = JSON.parse(bookingData);
      parsed.status = newStatus;
      localStorage.setItem(`booking_${bookingId}`, JSON.stringify(parsed));
    }
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
    localStorage.removeItem(`booking_${bookingId}`);
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-primary/20 text-primary';
      case 'pending': return 'bg-yellow-500/20 text-yellow-600';
      case 'completed': return 'bg-green-500/20 text-green-600';
      case 'cancelled': return 'bg-red-500/20 text-red-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-primary" />
            Booking Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, booking ID, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bookings found.</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.bookingId} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{booking.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ID: {booking.bookingId} • {booking.service.name}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(booking.date, 'MMM do, yyyy')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {booking.time}
                          </span>
                          <span className="font-semibold text-primary">
                            ₹{booking.service.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      
                      <div className="flex items-center space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Information</h4>
                                    <p><strong>Name:</strong> {selectedBooking.name}</p>
                                    <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                                    <p><strong>Email:</strong> {selectedBooking.email}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Appointment Details</h4>
                                    <p><strong>Service:</strong> {selectedBooking.service.name}</p>
                                    <p><strong>Date:</strong> {format(selectedBooking.date, 'EEEE, MMMM do, yyyy')}</p>
                                    <p><strong>Time:</strong> {selectedBooking.time}</p>
                                    <p><strong>Duration:</strong> {selectedBooking.service.duration}</p>
                                    <p><strong>Price:</strong> ₹{selectedBooking.service.price}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Select 
                          value={booking.status} 
                          onValueChange={(value) => updateBookingStatus(booking.bookingId, value as Booking['status'])}
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteBooking(booking.bookingId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};