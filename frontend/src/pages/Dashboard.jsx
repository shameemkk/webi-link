import { useAuth } from '../context/AuthContext';
import OrganizerDashboard from '../components/Dashboard/OrganizerDashboard';
import AttendeeDashboard from '../components/Dashboard/AttendeeDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    
    
    <div className='h-screen'>
      {user?.role === 'Organizer' ? <OrganizerDashboard /> : <AttendeeDashboard />}
    </div>
  );
};

export default Dashboard;