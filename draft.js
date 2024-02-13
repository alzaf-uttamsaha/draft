  const [tableBodyData, setTableBodyData] = useState([])

  const onSubmit = (data) => {
    console.log("on submit ")
    setTableBodyData(prevData => [
      ...prevData,
      {
        date: "2024-02-14 15:00:06",
        tags: data?.tag_name || data
      }
    ])
  };


//seraching form input filed
    const [searchValue, setSearchValue] = useState('');
    const [filteredResult, setFilteredResult] = useState([])
    const [records, setRecords] = useState([
        {
            type: "A",
            name: "ftp",
            priority: "0",
            content: "ip",
            TTL: "1800"
        },
    ]);
    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        setSearchValue(value);
        const searchResult = records.filter(item => item.type.includes(value));
        setFilteredResult(searchResult);
        if (value === "") {
            setFilteredResult(records)
        }
    }

    useEffect(() => {
        setFilteredResult(records);
    }, [records])
