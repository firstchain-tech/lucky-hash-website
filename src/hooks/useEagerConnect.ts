import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, gnosisSafe } from '../connectors';
import { isMobile } from '../utils/userAgent';
import { IS_IN_IFRAME } from '../constants/misc';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  const [triedSafe, setTriedSafe] = useState(!IS_IN_IFRAME);

  useEffect(() => {
    if (!triedSafe) {
      gnosisSafe.isSafeApp().then((loadedInSafe) => {
        if (loadedInSafe) {
          activate(gnosisSafe, undefined, true).catch(() => {
            setTriedSafe(true);
          });
        } else {
          setTriedSafe(true);
        }
      });
    }
  }, [activate, setTriedSafe, triedSafe]);

  useEffect(() => {
    if (!active && triedSafe) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          const { ethereum } = window as any;
          if (isMobile && ethereum) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        }
      });
    }
  }, [activate, active, triedSafe]);

  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

export default useEagerConnect;
