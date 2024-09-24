function ViewInformation(props: any) {
  const { companyData } = props;
  return (
    <>
    {/* {
      Object.keys(companyData).forEach(key => {
    const value = companyData[key as keyof typeof companyData];
    console.log(key,value)
  })

    } */}
      {Object.entries(companyData).map(([key, value]) => {
        return (
          <div
            className="grid grid-cols-12 border-[1.5px] border-stroke"
          >
            <label
              className="col-span-3 font-bold text-black dark:text-white px-4 py-4 border-e-[1.5px] border-stroke"
            >
              {key}:
            </label>
            <p
              className="col-span-7 text-black px-4 py-4 dark:text-white"
            >
              {value ? String(value) : ''}
            </p>
          </div>
        );
      }
      )
      }
    </>
  );
}

export default ViewInformation;
