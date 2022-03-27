export default function DashboardPage({user}){
  return (
    <div className="main">
    {user?.email} This is the Dashboard.
    </div>
  );
}