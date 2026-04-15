import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

/**
 * Sanity webhook endpoint for on-demand ISR revalidation.
 *
 * Configure in Sanity: https://www.sanity.io/manage → Webhooks
 * URL: https://your-domain.com/api/revalidate
 * Secret: SANITY_REVALIDATE_SECRET env variable
 * Trigger on: Create, Update, Delete
 * Filter: _type in ["product", "productCategory", "productSubcategory", "industry", "blogPost", "applicationNote", "whitepaper", "glossaryTerm", "newsEvent", "companyInfo", "certification", "teamMember", "siteSettings"]
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type = body?._type as string | undefined;

    // Map document types to routes that need revalidation
    const pathsToRevalidate: string[] = ["/"];

    switch (type) {
      case "product":
      case "productCategory":
      case "productSubcategory":
        pathsToRevalidate.push("/products");
        pathsToRevalidate.push("/products/detection");
        pathsToRevalidate.push("/products/emission");
        pathsToRevalidate.push("/products/integration");
        // Revalidate specific product detail if slug is available
        if (body?.slug?.current) {
          const category = body?.category;
          if (category) {
            pathsToRevalidate.push(`/products/${category}/${body.slug.current}`);
          }
        }
        break;

      case "industry":
        pathsToRevalidate.push("/applications");
        if (body?.slug?.current) {
          pathsToRevalidate.push(`/applications/${body.slug.current}`);
        }
        break;

      case "blogPost":
        pathsToRevalidate.push("/resources");
        pathsToRevalidate.push("/resources/blog");
        if (body?.slug?.current) {
          pathsToRevalidate.push(`/resources/blog/${body.slug.current}`);
        }
        break;

      case "applicationNote":
        pathsToRevalidate.push("/resources");
        pathsToRevalidate.push("/resources/application-notes");
        break;

      case "whitepaper":
        pathsToRevalidate.push("/resources");
        pathsToRevalidate.push("/resources/whitepapers");
        break;

      case "glossaryTerm":
        pathsToRevalidate.push("/resources/glossary");
        break;

      case "newsEvent":
        pathsToRevalidate.push("/news-events");
        break;

      case "companyInfo":
      case "teamMember":
      case "certification":
        pathsToRevalidate.push("/company");
        break;

      case "siteSettings":
        // Revalidate everything since settings affect the layout
        pathsToRevalidate.push("/", "layout");
        break;

      default:
        // Revalidate homepage as a safe default
        break;
    }

    // Deduplicate and revalidate
    const uniquePaths = [...new Set(pathsToRevalidate)];
    for (const path of uniquePaths) {
      revalidatePath(path);
    }

    return Response.json({
      revalidated: true,
      paths: uniquePaths,
      type,
      now: Date.now(),
    });
  } catch (err) {
    return Response.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 },
    );
  }
}
