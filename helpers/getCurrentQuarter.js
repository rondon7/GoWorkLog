const getCurrentQuarter = () => {
    let year = '2022';
    // year = new Date().getFullYear() + '';
    // console.log('Year', year)
    // let monthNo = (new Date().getMonth() + 1) + '';
    // console.log('Month No.', monthNo);
    let quarterNo = '3';
    // if (monthNo >= 1 && monthNo <= 3)
    //     quarterNo = '4';
    // else if (monthNo >= 4 && monthNo <= 6)
    //     quarterNo = '1';
    // else if (monthNo >= 7 && monthNo <= 9)
    //     quarterNo = '2';
    // else
    //     quarterNo = '3';
    // console.log('Quarter No.', quarterNo);
    return {
        Quarter: quarterNo,
        Year: year,
    };
}

export default getCurrentQuarter;