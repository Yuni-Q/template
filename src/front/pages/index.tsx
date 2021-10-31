import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Dialog } from '../components/dialog/Dialog';
import { DialogConfirm } from '../components/dialog/DialogConfirm';
import { Toast } from '../components/dialog/Toast';
import { Data } from '../store/Date';
import { useDialogStore } from '../store/DialogStore';
import { Selector } from '../store/Selector';

import { PageContext } from './_app';

const App: React.FC = () => {
  const number = useRecoilValue(Selector);
  return (
    <div>
      {number}
      hi
      <A />
      <B />
      <C />
    </div>
  );
};

export const getServerSideProps = async ({ req, res }: PageContext): Promise<any> => {
  return { props: {} };
};

export default App;

const A = () => {
  const [data, setData] = useRecoilState(Data);
  console.log('A', { data });
  return <input value={data} onChange={(e) => setData(e.target.value)} />;
};
const B = () => {
  const [data, setData] = useRecoilState(Data);
  console.log('B', { data });
  return <input value={data} onChange={(e) => setData(e.target.value)} />;
};
const C = () => {
  const { push, toast, confirm } = useDialogStore();
  return (
    <>
      <div>
        <button
          onClick={() => {
            push(<Dialog message="되라 !!!" />);
          }}>
          Dialog
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            push(<DialogConfirm message="되라 !!!" />);
          }}>
          DialogConfirm
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            push(<Toast message="되라 !!!" />);
          }}>
          Toast
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast('store test');
          }}>
          Toast Store
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            if (await confirm('confirm')) {
              console.log('confirm');
            } else {
              console.log('not confirm');
            }
          }}>
          DialogConfirm Store
        </button>
      </div>
    </>
  );
};
