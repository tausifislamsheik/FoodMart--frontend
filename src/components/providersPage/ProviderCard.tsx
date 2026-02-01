"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProviderCardProps {
  provider: any;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Card className="flex flex-col space-y-4 pt-0">
      <div className="relative w-full h-40 md:h-56 xl:h-80 rounded-xl overflow-hidden">
        {provider.logo ? (
          <Image
            src={provider.logo}
            alt={provider.restaurantName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white font-bold text-2xl">
            {provider.restaurantName.charAt(0)}
          </div>
        )}
      </div>
      <CardContent className="space-y-2">
        <CardTitle>Restaurant: <span className="font-bold">{provider.restaurantName}</span></CardTitle>
        <CardDescription className="text-gray-600 text-sm">
          Address: {provider.address}
        </CardDescription>
        <CardDescription className="text-gray-600 text-sm">
          Phone: {provider.phone}
        </CardDescription>
        <Link href={`/providers/${provider.id}`}>
          <Button className="w-full mt-2 bg-orange-500 cursor-pointer">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;