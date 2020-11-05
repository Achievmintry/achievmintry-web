export const truncateAddr = (addr) => {
    return addr.length > 20 ? addr.slice(0, 6) + '...' + addr.slice(-4) : addr;
  };