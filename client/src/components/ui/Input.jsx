import { forwardRef } from "react";
import { Input } from "@nextui-org/react";

export const InputNext = forwardRef((props, ref) => (
  <Input
    {...props}
    ref={ref}
    className="w-full   rounded-xl mb-4"
    style={{fontWeight:"500", color: "#666666"}}
  />
));
