import {
  CheckCircleIcon,
  PenIcon,
  TrashIcon,
  FloppyDiskBackIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'

function TodoItem({ item, onDeleteTask, onToggleStatus, onEditTask }) {
  const { status, text, id, editable } = item
  const [isEditable, setIsEditable] = useState(editable || false)
  function handleEdit() {
    setIsEditable(!isEditable)
  }

  function getStatus() {
    if (status === 'done') {
      return 'bg-green-500'
    }

    return 'bg-gray-400'
  }

  return (
    <div
      id={id}
      className='fw-full flex items-center gap-2 justify-start my-2 py-3 px-2 rounded-md bg-stone-100'
    >
      <span
        className={'inline-block w-[12px] h-[12px] rounded-full ' + getStatus()}
      ></span>

      {isEditable ? (
        <input
          className='bg-white px-2 border border-stone-900 w-full'
          type='text'
          name='task'
          value={text}
          onChange={(e) => onEditTask(e)}
        />
      ) : (
        <span>{text}</span>
      )}
      <div className='action-bar flex gap-2 ml-auto'>
        {!isEditable && (
          <button onClick={onToggleStatus}>
            {status === 'done' ? (
              <span className='text-green-500'>
                <CheckCircleIcon size={24} />
              </span>
            ) : (
              <span className='bg-cyan-100 px-2 py-2 rounded-md text-cyan-900 font-bold text-xs'>
                Segna come completata
              </span>
            )}
          </button>
        )}

        {status !== 'done' && (
          <button onClick={() => handleEdit()}>
            {isEditable ? (
              <FloppyDiskBackIcon size={24} />
            ) : (
              <PenIcon size={24} />
            )}
          </button>
        )}
        <button onClick={onDeleteTask}>
          <TrashIcon size={24} />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
