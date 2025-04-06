import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Citizen {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  citizenID?: string;
  streetAddress?: string; 
  city?: string;          
  state?: string;         
  zipcode?: string;       
  dob?: Date;             
}

interface CitizenContextType {
  citizen: Citizen | null;
  setCitizen: (citizen: Citizen) => void;
}

const CitizenContext = createContext<CitizenContextType | undefined>(undefined);

export const CitizenProvider = ({ children }: { children: ReactNode }) => {
  const [citizen, setCitizen] = useState<Citizen | null>(null);

  return (
    <CitizenContext.Provider value={{ citizen, setCitizen }}>
      {children}
    </CitizenContext.Provider>
  );
};

export const useCitizen = () => {
  const context = useContext(CitizenContext);
  if (!context) {
    throw new Error('useCitizen must be used within a CitizenProvider');
  }
  return context;
};
