import config from './config';

const subscribePeerToStream = (peer, stream) =>
  stream.current.getTracks().forEach((t) => peer.addTrack(t, stream.current));

const subscribeToIceCandidate = (id, peer, socket) => {
  peer.onicecandidate = (e) =>
    e.candidate && socket.current.emit('candidate', id, e.candidate);
};

const getOffer = async (id, peer) => {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  return offer;
};

const getAnswer = async (peer, description) => {
  await peer.setRemoteDescription(description);
  const answer = peer.createAnswer();
  await peer.setLocalDescription(answer);
  return answer;
};

const createPeerConnection = (id, stream, socket) => {
  const peer = new RTCPeerConnection(config);
  subscribePeerToStream(peer, stream);
  subscribeToIceCandidate(id, peer, socket);
  return peer;
};

const pipeVideoStream = (id, peer) => {
  peer.ontrack = (e) => {
    const element = document.getElementById(id);
    element && (element.srcObject = e.streams[0]);
  };
};

export { createPeerConnection, getOffer, getAnswer, pipeVideoStream };
