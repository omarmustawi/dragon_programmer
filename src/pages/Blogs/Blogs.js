import Loading from "../../components/Loading";
import Post from "../../components/Post";

export default function Blogs() {
  const data = [
    {
      name: "Omar mustawi",
      title: "How to Build Your Own Blog with Next.js and MDX",
      paragraph: `When I decided to build my blog,
      I found many tools out there that were readily available. I looked at Gastby along with content management systems like Ghost, Contentful, Sanity dot io, and HUGO.

            But I needed something that I could have total control over. I've also always been someone who loves the flexibility of writing own my custom code. When I do this, I can conveniently go back to where any issues might be when a problem arises.
            
            Gatsby provides this flexibility, and it is something I could get familiar with pretty easily since it's built on a library I use every day (React.js). But, I found out that I can do the exact same thing with Next.js by integrating MDX.
            
            "What is MDX?" You might ask me.
            
            Well... MDX is more or less like the markdown files we always see in GitHub repositories. MDX brings this flexibility into a markdown file by allowing you to literally write or import JavaScript (React) components into your articles. This in turn saves you from writing repetitive code.
            
            In this article, I am going to show you how I built my blog with these tools, so you can also try building something similar. You'll like this simple stack if you are a person who loves the flexibility that this approach brings.
            
            So, sit tight, and let's get started.`,
    },
    {
      name: "Omar mustawi",
      title: "How to Build Your Own Blog with Next.js and MDX",
      paragraph: `When I decided to build my blog, I found many tools out there that were readily available. I looked at Gastby along with content management systems like Ghost, Contentful, Sanity dot io, and HUGO.
  
              But I needed something that I could have total control over. I've also always been someone who loves the flexibility of writing own my custom code. When I do this, I can conveniently go back to where any issues might be when a problem arises.
              
              Gatsby provides this flexibility, and it is something I could get familiar with pretty easily since it's built on a library I use every day (React.js). But, I found out that I can do the exact same thing with Next.js by integrating MDX.
              
              "What is MDX?" You might ask me.
              
              Well... MDX is more or less like the markdown files we always see in GitHub repositories. MDX brings this flexibility into a markdown file by allowing you to literally write or import JavaScript (React) components into your articles. This in turn saves you from writing repetitive code.
              
              In this article, I am going to show you how I built my blog with these tools, so you can also try building something similar. You'll like this simple stack if you are a person who loves the flexibility that this approach brings.
              
              So, sit tight, and let's get started.`,
    },
    {
      name: "Omar mustawi",
      title: "How to Build Your Own Blog with Next.js and MDX",
      paragraph: `When I decided to build my blog, 
      I found many tools out there that were readily available. I looked at Gastby along with content management systems like Ghost, Contentful, Sanity dot io, and HUGO.
  
              But I needed something that I could have total control over. I've also always been someone who loves the flexibility of writing own my custom code. When I do this, I can conveniently go back to where any issues might be when a problem arises.
              
              Gatsby provides this flexibility, and it is something I could get familiar with pretty easily since it's built on a library I use every day (React.js). But, I found out that I can do the exact same thing with Next.js by integrating MDX.
              
              "What is MDX?" You might ask me.
              
              Well... MDX is more or less like the markdown files we always see in GitHub repositories. MDX brings this flexibility into a markdown file by allowing you to literally write or import JavaScript (React) components into your articles. This in turn saves you from writing repetitive code.
              
              In this article, I am going to show you how I built my blog with these tools, so you can also try building something similar. You'll like this simple stack if you are a person who loves the flexibility that this approach brings.
              
              So, sit tight, and let's get started.`,
    },
  ];
  return (
    <>
      {/* <Loading /> */}

      <section className=" bg-grayColor">
        <article className="intro lg:h-72 flex justify-center items-center h-48">
          <h1 className="lg:text-5xl text-3xl text-white font-semibold">Blogs </h1>
        </article>
        <div className="lg:py-20 lg:px-20 py-5 px-5">
          {data.map((post, key) => (
            <Post
              key={key}
              name={post.name}
              title={post.title}
              paragraph={post.paragraph}
            />
          ))}
        </div>
      </section>
    </>
  );
}
