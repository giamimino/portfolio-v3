import { TextConvert } from "@/utils/TextConvert";
import React from "react";

export default function page() {
  console.log(
    TextConvert(
      "``bullets/n/Designed and implemented full-stack projects using Next.js + Prisma with PostgreSQL/MySQL, including authentication (email/password, token-based ﬂows), proﬁle systems, and admin views.`` ``bullets/n/Built responsive, accessible UIs with React, Tailwind CSS, and modular component libraries. Emphasized reusability and clean component APIs.`` ``bullets/n/Managed deployments and CI-friendly workﬂows on Vercel.``"
    )
  );

  return (
    <div>
      <p className="text-white">
        {JSON.stringify(
          TextConvert(
            "``bullets/n/Designed and implemented full-stack projects using Next.js + Prisma with PostgreSQL/MySQL, including authentication (email/password, token-based ﬂows), proﬁle systems, and admin views.`` ``bullets/n/Built responsive, accessible UIs with React, Tailwind CSS, and modular component libraries. Emphasized reusability and clean component APIs.`` ``bullets/n/Managed deployments and CI-friendly workﬂows on Vercel.``"
          )
        )}
      </p>
      <div className="h-screen"></div>
    </div>
  );
}
