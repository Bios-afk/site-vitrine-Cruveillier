import { cn } from "../../lib/utils.js";

export default function Container({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cn("nlm-container", className)} {...rest}>
      {children}
    </Tag>
  );
}
