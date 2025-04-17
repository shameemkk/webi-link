import { useAuth } from '../context/AuthContext';
import OrganizerDashboard from '../components/Dashboard/OrganizerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    
    <div className='h-screen'>
      {user?.role === 'Organizer' ? <OrganizerDashboard /> : <div>Attendee Dashboard Coming Soon</div>}
    </div>
  );
};

export default Dashboard;