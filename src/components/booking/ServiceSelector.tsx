import { Clock } from "lucide-react";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  category: string;
}

interface ServiceSelectorProps {
  services: Service[];
  selectedService: string;
  onServiceSelect: (service: Service) => void;
}

export const ServiceSelector = ({ services, selectedService, onServiceSelect }: ServiceSelectorProps) => {
  const categories = [...new Set(services.map(service => service.category))];

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-3">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services
              .filter(service => service.category === category)
              .map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onServiceSelect(service)}
                  className={`glass-card p-4 rounded-xl text-left transition-all duration-300 hover:animate-glow group ${
                    selectedService === service.id
                      ? 'border-rose-gold bg-rose-gold/10'
                      : 'border-glass-border hover:border-rose-gold/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-montserrat font-semibold transition-colors ${
                      selectedService === service.id ? 'text-rose-gold' : 'text-foreground group-hover:text-rose-gold'
                    }`}>
                      {service.name}
                    </h4>
                    <span className="text-xl font-bold text-rose-gold">
                      ₹{service.price}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{service.duration}</span>
                  </div>
                  
                  {selectedService === service.id && (
                    <div className="mt-3 flex items-center text-sm text-rose-gold font-semibold">
                      <div className="w-2 h-2 bg-rose-gold rounded-full mr-2"></div>
                      Selected
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};