import player from 'play-sound';

async function playFiles(paths: string[]) {
    for (let i = 0; i < paths.length; i++) {
        await playFile(paths[i]);
      }
  }
  
async function playFile(file: string) {
    const play = player();

    return new Promise<void>((resolve, reject) => {
        play.play(file, (err: any) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
        });
    });
}

export {
    playFiles
}
  