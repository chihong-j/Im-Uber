import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { userInfo } from '../models/user.model';
import { Boarding } from '../models/journey.model';

interface UserContextType {
  user: userInfo | null;
  setUser: (userData: userInfo | null) => void;
  profileStatus: [string, string];
  setProfileStatus: (profileStatus: [string, string]) => void;
  lastHome: string;
  setLastHome: (lastHome: string) => void;
  driverStatus: string;
  setDriverStatus: (driverStatus: string) => void;
  boardingInfo: Boarding[];
  setBoardingInfo: (boarding: Boarding[]) => void;
  isDeparture: boolean;
  setIsDeparture: (isDeparture: boolean) => void;
  isArrival: boolean;
  setIsArrival: (isArrival: boolean) => void;
  isRating: boolean;
  setIsRating: (isRating: boolean) => void;
}

enum ProfileStatus {
  Home = "home",
  UserInfo = "userInfo",
  FavRoute = "favRoute",
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<userInfo | null>(null);
  const [boardingInfo, setBoardingInfo] = useState<Boarding[]>([]);
  const [ profileStatus, setProfileStatus ] = useState<[string, string]>(["home", ""]);
  const [driverStatus, setDriverStatus] = useState<string>('start')
  const [ lastHome, setLastHome ] = useState<string>("/passengerHome");
  const [isDeparture, setIsDeparture] = useState(true);
  const [isArrival, setIsArrival] = useState(false);
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    const storeUser = localStorage.getItem("uberUser");
    if(storeUser !== null){
      setUser(JSON.parse(storeUser));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("uberUser", JSON.stringify(user));
  }, [user])




  return (
    <UserContext.Provider value={{ 
      user, setUser, 
      profileStatus, setProfileStatus, 
      lastHome, setLastHome, 
      driverStatus, setDriverStatus, 
      boardingInfo, setBoardingInfo,
      isDeparture, setIsDeparture,
      isArrival, setIsArrival,
      isRating, setIsRating
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};