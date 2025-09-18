import SocialFeed from '@/components/dashboard/social-feed';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="md:col-span-2 mx-auto w-full max-w-2xl">
        <SocialFeed />
      </div>
       <div className="hidden md:block">
        {/* Placeholder for potential future content like trends, featured projects etc. */}
      </div>
    </div>
  );
}
