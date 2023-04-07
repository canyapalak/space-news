import { useEffect } from 'react'
import ReactDom from 'react-dom'

interface ModalI {
  open: boolean
  setOpen: (bool: boolean) => void
  url: string
}

export default function Modal({ open, setOpen, url }: ModalI) {
  useEffect(() => {
    const detectKeyDown = (e: any) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', detectKeyDown)
    return () => {
      document.removeEventListener('keydown', detectKeyDown)
    }
  }, [])

  if (!open) return null

  const handleClick = () => {
    window.open(url, '_blank')
    setOpen(false)
  }

  //create portal element and check if javascript gets the div
  const portal = document.getElementById('portal')
  if (portal) {
    return ReactDom.createPortal(
      <>
        <div
          className='fixed top-0 left-0 bottom-0 right-0 bg-gradient-to-br
          from-transparent/20 to-neutral-900'
          onClick={() => setOpen(false)}
        />
        <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
        w-screen h-full lg:h-[30%] lg:w-[35vw] modal z-20'>
          <div className='bg-gray-200 w-full h-full flex justify-center items-center 
          rounded-lg relative outline outline-2 outline-sky-200'>
            <div className='flex flex-col gap-8'>
              <button
                onClick={() => setOpen(false)}
                className='absolute top-1 right-5'
              >
                <p className='text-lg font-bold font-nasalization'>X</p>
              </button>
              <h2 className='text-lg text-center font-navine px-3 mt-5'>
                You are{' '}
                <span className='text-cyan-700 font-semibold'>leaving</span>{' '}
                'Space News' to visit the source. Continue
                to external site?
              </h2>
              <div className='flex justify-center gap-5 items-center mx-3'>
                <button
                  onClick={() => setOpen(false)}
                  className='bg-stone-400 px-3 py-1 hover:shadow-md hover:shadow-stone-900 rounded 
                  text-lg font-nasalization'
                >
                  stay on this site
                </button>
                <button
                  onClick={handleClick}
                  className='bg-cyan-500 hover:shadow-md hover:shadow-stone-900 px-4 py-1 rounded 
                  text-lg font-nasalization'
                >
                  yes, continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </>,
      portal,
    )
  } else {
    return <div></div>
  }
}
