type GradientFieldProps = {
  variant?: "hero" | "page" | "feature";
};

export default function GradientField({ variant = "page" }: GradientFieldProps) {
  return <div className={`gradient-field gradient-field--${variant}`} aria-hidden="true" />;
}
