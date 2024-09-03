export const convertToHours = (time: string) => {
  
    const [hours, minutes] = time.split(':').map(Number);
   
    const totalHours = hours + minutes / 60;
    return totalHours;
  }