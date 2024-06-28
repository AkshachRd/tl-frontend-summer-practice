import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useBoundStore } from "@/store/store";

export default function IndexPage() {
  const navigate = useNavigate();

  const decks = useBoundStore((state) => state.decks);

  useLayoutEffect(() => {
    if (decks.length > 0) {
      navigate("/decks");
    }
  }, [decks.length]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-around gap-4 py-8 md:py-10 h-full">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Make your&nbsp;</h1>
          <br />
          <h1 className={title({ color: "violet" })}>
            language&nbsp;learning&nbsp;
          </h1>
          <h1 className={title()}>efficient with flesh cards.</h1>
        </div>

        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={"/decks"}
        >
          Start learning
        </Link>
      </section>
    </DefaultLayout>
  );
}
