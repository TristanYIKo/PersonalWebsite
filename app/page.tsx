import { Portfolio } from "@/components/portfolio/portfolio";

export default function Home() {
  return <Portfolio year={new Date().getFullYear()} />;
}
