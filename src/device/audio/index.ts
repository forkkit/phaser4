//  @namespace Phaser.Device.Audio

import { canPlayM4A } from './canPlayM4A';
import { canPlayMP3 } from './canPlayMP3';
import { canPlayOGG } from './canPlayOGG';
import { canPlayOpus } from './canPlayOpus';
import { canPlayWAV } from './canPlayWAV';
import { canPlayWebM } from './canPlayWebM';
import { GetAudio } from './GetAudio';
import { hasAudio } from './hasAudio';
import { hasWebAudio } from './hasWebAudio';

export default {
    canPlayM4A,
    canPlayMP3,
    canPlayOGG,
    canPlayOpus,
    canPlayWAV,
    canPlayWebM,
    GetAudio,
    hasAudio,
    hasWebAudio
};

export * from './canPlayM4A';
export * from './canPlayMP3';
export * from './canPlayOGG';
export * from './canPlayOpus';
export * from './canPlayWAV';
export * from './canPlayWebM';
export * from './GetAudio';
export * from './hasAudio';
export * from './hasWebAudio';
