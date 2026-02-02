import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, MapPin } from "lucide-react";

const HomeBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full border border-orange-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-medium text-orange-500">Now delivering in your area</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Delicious Food,
                <br />
                <span className="text-orange-500">Delivered Fast</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                From local favorites to gourmet cuisines — discover restaurants near you and get your cravings satisfied in minutes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group text-base px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 bg-orange-500 cursor-pointer">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 py-6 hover:bg-orange-500 hover:text-white border border-orange-200 text-orange-500 cursor-pointer">
                Explore Menu
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-2 rounded-full bg-secondary">
                  <Clock className="h-4 w-4 text-orange-400" />
                </div>
                <span className="text-sm font-medium">30 min delivery</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-2 rounded-full bg-secondary">
                  <Star className="h-4 w-4 text-orange-400" />
                </div>
                <span className="text-sm font-medium">4.9 rating</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-2 rounded-full bg-secondary">
                  <MapPin className="h-4 w-4 text-orange-400" />
                </div>
                <span className="text-sm font-medium">500+ restaurants</span>
              </div>
            </div>
          </div>

          {/* Right Content - Food Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 border border-border/50 shadow-2xl overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border-2 border-dashed border-orange-300 animate-[spin_20s_linear_infinite]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full border-2 border-dashed border-orange-300 animate-[spin_15s_linear_infinite_reverse]" />
                </div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2 p-8">
                    <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-5xl">🍔</span>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">Your favorite food awaits</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border border-border/50 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍕</span>
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">Pizza Express</p>
                    <p className="text-xs text-muted-foreground">15 min away</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border border-border/50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🥗</span>
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">Fresh Salads</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                      <span className="text-xs text-muted-foreground">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;