// ==UserScript==
// @name         StereoMic for Enmity
// @author       vohoaikhang
// @version      1.0
// @description  Thử nhân đôi mic vào 2 kênh stereo trong Discord Enmity
// ==/UserScript==

module.exports = {
  name: "StereoMicEnmity",
  description: "Ép tín hiệu mic thành stereo 2 kênh (giả lập)",
  start() {
    const ctx = new AudioContext();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mic = ctx.createMediaStreamSource(stream);
      const merger = ctx.createChannelMerger(2);

      mic.connect(merger, 0, 0); // mic → L
      mic.connect(merger, 0, 1); // mic → R

      const stereoOutput = ctx.createMediaStreamDestination();
      merger.connect(stereoOutput);

      // DEBUG: mở loopback nghe thử
      const out = ctx.createMediaStreamSource(stereoOutput.stream);
      out.connect(ctx.destination);

      console.log("[StereoMicEnmity] Stream stereo tạo thành công:", stereoOutput.stream);
    });
  },
  stop() {
    console.log("[StereoMicEnmity] Dừng xử lý stereo mic");
  }
};
