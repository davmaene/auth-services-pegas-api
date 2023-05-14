import { v4 as uuidv4 } from 'uuid';
import { NIL as NIL_UUID } from 'uuid';

const options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('1995-18-04').getTime(),
    nsecs: 5678,
  };

export const uuid = uuidv4(options);
export const nullUuid = NIL_UUID