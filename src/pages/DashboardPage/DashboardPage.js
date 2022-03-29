export default function DashboardPage({user}){
  console.log('user is', user);
  return (
    <div className="main">
    {user?.email} This is the Dashboard.
    </div>
  );
}