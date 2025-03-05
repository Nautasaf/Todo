// 2 разобраться в работе useEffect
const Component = () => {
    console.log('body') //первый
    useEffect(() => {
      console.log('useEffect') // третий
      return  () => {
        console.log('useEffect return')
      }
    })
  
    useLayoutEffect(() => {
      console.log('useLayoutEffect') // второй
      return () => {
        console.log('useLayoutEffect return')
      }
    })
  
  
    return <div/>

    // Видим в консоли
    // body
    // useLayoutEffect
    // useEffect

    // При обновлении зависимостей:
    // useLayoutEffect return
    // useEffect return
    // body
    // useLayoutEffect
    // useEffect
  }
  
  
  on mount 
  
	body // первый
	useLayoutEffect // второй
  useEffect // третий
  

  on update
  
	useLayoutEffect return // первый
  useEffect return // второй
  body // третий
  useLayoutEffect // четвертый
  useEffect // пятый
  

  on unmount
  
  useLayoutEffect return // первый
  useEffect return // второй
  
  
  // 3 разобраться в работе useEffect2
  
  const A = () => {
    console.log('A body')
     useEffect(() => {
      console.log('A useEffect')
      return  () => {
        console.log('A useEffect return')
      }
    })
  
    useLayoutEffect(() => {
      console.log('A useLayoutEffect')
      return () => {
        console.log('A useLayoutEffect return')
      }
    })
  
    return <B />
  }
  const B = () => {
    console.log('B body')
     useEffect(() => {
      console.log('B useEffect')
      return  () => {
        console.log('B useEffect return')
      }
    })
  
    useLayoutEffect(() => {
      console.log('B useLayoutEffect')
      return () => {
        console.log('B useLayoutEffect return')
      }
    })
  
    return <C />
  }
  const C = () => {
    console.log('C body')
     useEffect(() => {
      console.log('C useEffect')
      return  () => {
        console.log('C useEffect return')
      }
    })
  
    useLayoutEffect(() => {
      console.log('C useLayoutEffect')
      return () => {
        console.log('C useLayoutEffect return')
      }
    })
  
    return <div />
  }
  
  
  const App = () => {
    return <A />
  }
  
  on mount

  // A body
  // A useLayoutEffect
  // B body
  // B useLayoutEffect
	// C body
	// C useLayoutEffect

	// A useEffect
	// B useEffect
	// C useEffect
  
  on update

	// C return useLayoutEffect
	// B return useLayoutEffect
	// A return useLayoutEffect

	// A body
  // A useLayoutEffect
  // B body
  // B useLayoutEffect
	// C body
	// C useLayoutEffect

	// C return useEffect
	// B return useEffect
	// A return useEffect

	// A useEffect
	// B useEffect
	// C useEffect
  
  on unmount
  
	// C return useLayoutEffect
	// B return useLayoutEffect
	// A return useLayoutEffect

	// C return useEffect
	// B return useEffect
	// A return useEffect