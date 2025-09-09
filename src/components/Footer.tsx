import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Heart } from "lucide-react";

const Footer = () => {
  const services = [
    "Hair Styling",
    "Bridal Makeup",
    "Nail Art",
    "Skincare",
    "Beauty Courses",
    "Photoshoot Makeup"
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-primary/5"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-primary mb-4">
                Feelings Beauty Care
              </h3>
              <p className="text-muted-foreground font-montserrat leading-relaxed">
                Jamnagar's premier luxury beauty salon and academy. Experience the finest in beauty care since 2010.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-montserrat font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="glass-card p-3 rounded-lg hover:bg-rose-gold/20 transition-all duration-300 hover:animate-glow"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-rose-gold" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair font-bold text-foreground mb-6 text-lg">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-primary transition-colors font-montserrat hover:underline"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-bold text-foreground mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3 font-montserrat">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#courses" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                  Beauty Courses
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair font-bold text-foreground mb-6 text-lg">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-rose-gold mt-0.5 flex-shrink-0" />
                <div className="font-montserrat">
                  <p className="text-foreground font-semibold">Feelings Beauty Care</p>
                  <p className="text-muted-foreground text-sm">123 Beauty Street, Near City Mall</p>
                  <p className="text-muted-foreground text-sm">Jamnagar, Gujarat 361001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-gold" />
                <a 
                  href="tel:+919876543210" 
                  className="text-muted-foreground hover:text-primary transition-colors font-montserrat"
                >
                  +91 98765 43210
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-gold" />
                <a 
                  href="mailto:info@feelingsbeautycare.com" 
                  className="text-muted-foreground hover:text-primary transition-colors font-montserrat"
                >
                  info@feelingsbeautycare.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-rose-gold" />
                <div className="font-montserrat">
                  <p className="text-muted-foreground text-sm">Open Daily</p>
                  <p className="text-muted-foreground text-sm">10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground font-montserrat">
              <span>© 2024 Feelings Beauty Care. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground font-montserrat">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-rose-gold animate-pulse" />
              <span>in Jamnagar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 3}s`,
            }}
          >
            <Heart className="h-8 w-8 text-rose-gold" />
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;