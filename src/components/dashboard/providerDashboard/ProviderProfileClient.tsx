"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { providerService } from "@/services/provider.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  profile: any | null;
}

const ProviderProfileClient = ({ profile }: Props) => {
  const router = useRouter();
  const isEdit = Boolean(profile);

  const [form, setForm] = useState<{
    restaurantName: string;
    address: string;
    phone: string;
    logo?: string;
  }>({
    restaurantName: profile?.restaurantName ?? "",
    address: profile?.address ?? "",
    phone: profile?.phone ?? "",
    logo: profile?.logo ?? "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(profile?.logo ?? null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImageToImgbb = async (): Promise<string | undefined> => {
    if (!imageFile) return form.logo || undefined;

    const body = new FormData();
    body.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body },
    );

    const data = await res.json();

    if (!data.success) throw new Error("Image upload failed");

    return data.data.url;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const logoUrl = await uploadImageToImgbb();

      const payload: {
        restaurantName: string;
        address: string;
        phone: string;
        logo?: string;
      } = {
        restaurantName: form.restaurantName,
        address: form.address,
        phone: form.phone,
        ...(logoUrl ? { logo: logoUrl } : {}),
      };

      const res = isEdit
        ? await providerService.updateProviderProfile(profile.id, payload)
        : await providerService.createProviderProfile(payload);

      if (res.error) {
        toast.error(res.error.message || "Something went wrong");
        return;
      }

      toast.success(
        isEdit
          ? "Profile updated successfully"
          : "Profile created successfully",
      );

      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>
            {isEdit ? "Your Provider Profile" : "Create Provider Profile"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Restaurant Name */}
          <div>
            <Label className="mb-1">Restaurant Name</Label>
            <Input
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              placeholder="e.g. FoodHub Kitchen"
            />
          </div>

          {/* Address */}
          <div>
            <Label className="mb-1">Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full address"
            />
          </div>

          {/* Phone */}
          <div>
            <Label className="mb-1">Phone</Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <Label className="mb-2">Logo</Label>

            {preview && (
              <div className="relative h-24 w-24 mb-2">
                <Image
                  src={preview}
                  alt="Logo Preview"
                  fill
                  className="object-cover rounded-md border"
                  unoptimized
                />
              </div>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>

          <Button
            className="w-full mt-4 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isEdit
                ? "Update Profile"
                : "Create Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderProfileClient;