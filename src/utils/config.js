const config = {
  iceServers: [
    {
      urls: ['turn:numb.viagenie.ca'],
      username: 'jonathon.d.meyers@gmail.com',
      credential: 'fj8KAARSAZ5S'
    },
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};

export default config;
