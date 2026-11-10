let stream;
export async function startCamera(video) {
  stopCamera();
  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
  video.srcObject = stream;
  await video.play().catch(() => {});
}
export function stopCamera() { stream?.getTracks().forEach(t => t.stop()); stream = null; }
