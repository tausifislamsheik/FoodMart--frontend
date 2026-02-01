import PopularMealsProviderSection from "@/components/homePage/PopularMealsProviderSection";
import RecentMeals from "@/components/homePage/RecentMeals";
import CategoryCards from "@/components/homePage/CategoryCards";
import WhyChooseUs from "@/components/homePage/WhyChooseUs";
import HowItWorks from "@/components/homePage/HowItWorks";
import HomeBanner from "@/components/homePage/HomeBanner";

export default function Home() {
  return (
    <div className="max-w-8xl mx-auto">
      <HomeBanner />
      <HowItWorks />
      <RecentMeals />
      <PopularMealsProviderSection />
      <CategoryCards />
      <WhyChooseUs />
    </div>
  );
}
