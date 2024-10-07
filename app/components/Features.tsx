import { CloudRain } from "lucide-react";
import React from "react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A facilis minus blanditiis voluptate dolorum laborum odio fuga consequuntur quia deleniti eaque reprehenderit quis ducimus, ad, nisi minima commodi eveniet vero.",
    icon: CloudRain,
  },
  {
    name: "Blazing fast",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A facilis minus blanditiis voluptate dolorum laborum odio fuga consequuntur quia deleniti eaque reprehenderit quis ducimus, ad, nisi minima commodi eveniet vero.",
    icon: CloudRain,
  },
  {
    name: "Super secure with nylas",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A facilis minus blanditiis voluptate dolorum laborum odio fuga consequuntur quia deleniti eaque reprehenderit quis ducimus, ad, nisi minima commodi eveniet vero.",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A facilis minus blanditiis voluptate dolorum laborum odio fuga consequuntur quia deleniti eaque reprehenderit quis ducimus, ad, nisi minima commodi eveniet vero.",
    icon: CloudRain,
  },
];

const Features = () => {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="font-semibold leading-7 text-primary">Scheadule faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Scheadule meetings in minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With Calendar you can schedule meetings in minutes. We make it easy
          for you to schedule meeting in minutes. The meetings are very fast and
          easy to schedule!
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div className="relative pl-16" key={feature.name}>
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
