import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';

const Context = createContext();
const useSocket = () => useContext(Context);

const SocketProvider = ({ children }) => {
  const [socket] = useState(io.connect(process.env.SOCKET_URL));

  console.log(process.env.REACT_APP_SOCKET_URL);

  useEffect(() => {
    return () => {
      socket.close();
    };
  });

  const exposed = {
    socket,
    id: socket.id,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export { SocketProvider as default, Context, useSocket };
