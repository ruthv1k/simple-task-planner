import { Task } from '@/types/task'
import { useEffect } from 'react'
import Tasks from '@/components/tasks'

interface Props {
  popup: {
    isOpen: boolean
    date: string
  }
  setPopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean
      date: string
    }>
  >
  submitForm: (form: Task) => void
  tasks: Array<Task>
  markAsDone: (id: string) => void
}

const Popup: React.FC<Props> = ({
  popup,
  setPopup,
  submitForm,
  tasks,
  markAsDone,
}) => {
  let form: Task = {
    id: '',
    title: '',
    description: '',
    date: '',
    fromTime: '',
    toTime: '',
    isDone: false,
  }

  function setTaskTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    let taskTitle = (e.target as HTMLInputElement).value
    form.title = taskTitle
  }

  function setDescription(e: React.ChangeEvent<HTMLInputElement>): void {
    let description = (e.target as HTMLInputElement).value
    form.description = description
  }

  function setFrom(e: React.ChangeEvent<HTMLInputElement>): void {
    let from = (e.currentTarget as HTMLInputElement).value

    form.fromTime = from
  }

  function setTo(e: React.ChangeEvent<HTMLInputElement>): void {
    let to = (e.target as HTMLInputElement).value
    form.toTime = to
  }

  useEffect(() => {
    form.date = popup.date
  }, [popup.isOpen])

  return (
    <div className="overlay">
      <div className="flex bg-white border rounded-md popup md:w-11/12 lg:max-w-5xl">
        <div className="w-3/5 px-6 py-8 popup-content">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setPopup({ ...popup, isOpen: false })}
              className="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-dark"
                fill="current"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="ml-4 text-xl font-medium">
              Schedule tasks on {popup.date}
            </h3>
          </div>

          <div className="mt-6">
            <label htmlFor="form_title" className="block pb-2">
              What's the task?
            </label>
            <input
              type="text"
              placeholder="Schedule a meet with the team..."
              id="form_title"
              className="w-full px-4 py-2 border border-border-light focus:outline-none"
              onChange={setTaskTitle}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="add_field" className="block pb-2">
              Any message you want to add to the task?
            </label>
            <input
              type="text"
              placeholder="Get feedback about the progress and look for any blockers"
              id="form_title"
              className="w-full px-4 py-2 border border-border-light focus:outline-none"
              onChange={setDescription}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="add_field" className="block pb-2">
              Time Slot
            </label>
            <div className="flex items-center justify-between w-1/2">
              <div>
                <label htmlFor="from">From</label>
                <input
                  type="time"
                  placeholder="From"
                  id="fromTime"
                  className="px-4 py-2 ml-4 border border-border-light focus:outline-none"
                  onChange={setFrom}
                />
              </div>
              <div>
                <label htmlFor="to">To</label>
                <input
                  type="time"
                  placeholder="To"
                  id="toTime"
                  className="px-4 py-2 ml-4 border border-border-light focus:outline-none"
                  onChange={setTo}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="px-6 py-3 text-white transition-all duration-150 ease-linear border border-light-theme-primary bg-light-theme-primary hover:bg-transparent hover:text-light-theme-primary"
              onClick={() => submitForm(form)}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="w-2/5 px-6 py-8 ">
          <Tasks tasks={tasks} markAsDone={markAsDone} date={popup.date} />
        </div>
      </div>
    </div>
  )
}

export default Popup
