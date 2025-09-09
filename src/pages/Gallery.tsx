import { useState } from "react";
import { Camera, Heart, Star, Crown, Filter, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "All Work" },
    { id: "bridal", name: "Bridal" },
    { id: "party", name: "Party Makeup" },
    { id: "hair", name: "Hair Styling" },
    { id: "before-after", name: "Before & After" },
    { id: "salon", name: "Salon Interior" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "bridal",
      image: "/api/placeholder/400/600",
      title: "Traditional Bridal Look",
      description: "Classic Indian bridal makeup with intricate detailing",
      client: "Priya's Wedding",
    },
    {
      id: 2,
      category: "party",
      image: "/api/placeholder/400/600",
      title: "Glamorous Party Makeup",
      description: "Bold and stunning look for special occasions",
      client: "Anniversary Celebration",
    },
    {
      id: 3,
      category: "hair",
      image: "/api/placeholder/400/600",
      title: "Elegant Bridal Hairstyle",
      description: "Sophisticated updo with floral accessories",
      client: "Reception Hair Styling",
    },
    {
      id: 4,
      category: "before-after",
      image: "/api/placeholder/600/400",
      title: "Complete Transformation",
      description: "Dramatic before and after makeover",
      client: "Makeover Session",
    },
    {
      id: 5,
      category: "bridal",
      image: "/api/placeholder/400/600",
      title: "Royal Bridal Makeup",
      description: "Luxurious bridal look with gold accents",
      client: "Destination Wedding",
    },
    {
      id: 6,
      category: "salon",
      image: "/api/placeholder/600/400",
      title: "Luxury Makeup Station",
      description: "Professional makeup area with premium lighting",
      client: "Salon Interior",
    },
    {
      id: 7,
      category: "party",
      image: "/api/placeholder/400/600",
      title: "Evening Glam Look",
      description: "Smokey eyes with nude lips for evening events",
      client: "Corporate Event",
    },
    {
      id: 8,
      category: "hair",
      image: "/api/placeholder/400/600",
      title: "Modern Hair Color",
      description: "Trendy balayage with professional styling",
      client: "Color Transformation",
    },
    {
      id: 9,
      category: "before-after",
      image: "/api/placeholder/600/400",
      title: "Bridal Transformation",
      description: "Complete bridal makeover journey",
      client: "Wedding Preparation",
    },
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-primary/5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8">
              <Camera className="h-5 w-5 text-rose-gold" />
              <span className="text-sm font-montserrat font-medium">Our Gallery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
              Beauty
              <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-primary bg-clip-text"> Transformations</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
              Witness the magic of beauty transformation through our portfolio of stunning makeovers, elegant hairstyles, and luxurious salon experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground mr-2" />
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "luxury" : "glass"}
                  size="sm"
                  onClick={() => setActiveFilter(category.id)}
                  className="text-sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "luxury" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "luxury" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 lg:grid-cols-2"
          }`}>
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className={`group glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  viewMode === "list" ? "flex items-center" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === "list" 
                    ? "w-1/2 aspect-[4/3]" 
                    : item.category === "before-after" || item.category === "salon" 
                      ? "aspect-[4/3]" 
                      : "aspect-[3/4]"
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  {/* Overlay Icons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="p-2 glass-card rounded-full">
                      <Heart className="h-4 w-4 text-rose-gold" />
                    </div>
                    <div className="p-2 glass-card rounded-full">
                      <Star className="h-4 w-4 text-rose-gold" />
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-primary to-rose-gold text-background px-3 py-1 rounded-full text-xs font-montserrat font-semibold capitalize">
                      {item.category.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "w-1/2" : ""}`}>
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-rose-gold font-montserrat font-medium">
                      {item.client}
                    </span>
                    <Button variant="glass" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button variant="luxury" size="lg">
              Load More Images
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-rose-gold/5">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="h-16 w-16 text-rose-gold mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Ready for Your Transformation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our expert team create a stunning look that's uniquely yours. Book your appointment today and join our gallery of beautiful transformations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="luxury" size="lg" className="text-lg px-8 py-6">
                Book Your Session
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                Get Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;