import { useState } from 'react';

const CustomSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('За популярністю');
  
    const handleSelect = (value: string) => {
      setSelected(value);
      setIsOpen(false);
    };
  
    return (
      <div style={{
        position: 'relative',
        width: '220px',
        borderRadius: '5px',
        border: '1px solid #99a1af',
        backgroundColor: '#000',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        marginTop: '2.5px'
      }}>
        <div 
          onClick={() => setIsOpen(!isOpen)} 
          style={{
            padding: '4.5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            textAlign: 'center'
          }}
        >
          {selected}
          <span style={{
            position: 'absolute',
            right: '10px',
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>▼</span>
        </div>
  
        {isOpen && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#000',
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            borderRadius: '5px',
            border: '1px solid #B2ABB1',
            overflow: 'hidden'
          }}>
            {["За популярністю", "За рейтингом"].map((text, index, arr) => (
              <li 
                key={text}
                onClick={() => handleSelect(text)} 
                style={{ 
                  width: '100%',
                  textAlign: 'center',
                  lineHeight: '30px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                  borderRadius: index === 0 ? "5px 5px 0 0" : index === arr.length - 1 ? "0 0 5px 5px" : "0"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  

export default CustomSelect;