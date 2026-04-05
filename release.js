require('dotenv').config({ path: '.env' });
const path = require('path');
const { NodeSSH } = require('node-ssh');

const ssh = new NodeSSH();
const localBuildDir = path.join(__dirname, 'build');
const remoteDir = '/var/www/altvision.se';

async function deploy() {
  try {
    await ssh.connect({
      host: process.env.SFTP_HOST,
      port: process.env.SFTP_PORT || '22',
      username: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD,
    });

    console.log(`Uploading build/ → ${remoteDir}...`);
    await ssh.putDirectory(localBuildDir, remoteDir, {
      recursive: true,
      tick: (localPath, remotePath, error) => {
        if (error) console.error(`Failed: ${localPath}`, error);
      },
    });
    console.log('Upload complete.');
    
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  } finally {
    ssh.dispose();
  }
}

deploy();
