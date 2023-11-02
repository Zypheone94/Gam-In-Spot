import React, {useEffect, useState, useRef} from 'react';

function Selector({selectorList, isSearch, setValue, defaultValue, placeHolder, width, openHeight}) {


    const [isOpen, setIsOpen] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : '');
    const [isDisable, setIsDisable] = useState(true);


    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        selectorList.length === 0 ? setIsDisable(true) : setIsDisable(false);
    }, [selectorList]);

    useEffect(() => {
        if (selectedValue !== '') setIsOpen(false);
    }, [selectedValue]);

    useEffect(() => {
        if (searchContent !== '') {
            setSelectedValue(searchContent);
            if (!isOpen) {
                setSearchContent('');
            } else if (!isOpen && !isSearch) {
                setValue(selectedValue);
            }
        }
        // eslint-disable-next-line
    }, [isOpen]);

    const onSearch = e => {
        setSearchContent(e.target.value);
        setValue(e.target.value);
        setSelectedValue('');
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div
            onClick={isDisable ? null : () => setIsOpen(true)}
            ref={wrapperRef}
            className=''
            style={{
                borderColor: isOpen && 'purple',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: isOpen ? 12 : 10,
                cursor: isDisable ? 'not-allowed' : 'pointer',
                background: isDisable ? '#EEEEEE' : '',
                position: isOpen ? 'absolute' : 'relative',
                width: width ? width : '185px',
                minHeight: '30px',
                borderRadius: '8px',
                border: '1px solid ',
                '&:hover': {
                    borderColor: 'green'
                }
            }}
        >
            {isSearch ? (
                isSearch && (
                    <input
                        type="text"
                        className=''
                        onChange={event => onSearch(event)}
                        value={searchContent !== '' ? searchContent : selectedValue}
                        placeholder={placeHolder}
                        disabled={isDisable}
                        style={{
                            cursor: isDisable ? 'not-allowed' : 'pointer',
                            background: isDisable ? '#EEEEEE' : '',
                            width: '165px',
                            margin: '7px 13px',
                            fontSize: '14px',
                            color: 'red',
                            fontFamily: 'inherit',
                            fontWeight: '600',
                            borderBottom: '1px solid ' + 'red',
                            '&:hover': {
                                borderBottom: '2px solid ' + 'red',
                                marginBottom: '6px'
                            },
                            '&:focus-visible': {
                                outline: 'none',
                                borderBottom: '2px solid ' + 'red'
                            }
                        }}
                    />
                )
            ) : selectedValue && !isOpen ? (
                <p style={{marginLeft: '10px'}}>{selectedValue}</p>
            ) : (
                !isSearch && !isOpen && <p style={{marginLeft: '10px', color: 'lightgray'}}>{placeHolder}</p>
            )}

            {selectorList && isOpen && (
                <div style={{maxHeight: openHeight ? openHeight : '250px', overflowY: 'scroll', overflowX: 'hidden'}}>
                    {
                        selectorList.map((data, id) => {
                            if (searchContent && data.toLowerCase().includes(searchContent.toLowerCase())) {
                                return (
                                    <div
                                        className=''
                                        key={id}
                                        onClick={() => {
                                            setSelectedValue(data);
                                            setValue(data);
                                            setSearchContent(data);
                                        }}
                                        style={{
                                            padding: '7px 13px',
                                            color: 'lime',
                                            '&:hover': {
                                                backgroundColor: '#E5E5E5'
                                            }
                                        }}
                                    >
                                        {data}
                                    </div>
                                );
                            } else if (!searchContent)
                                return (
                                    <div
                                        className=''
                                        key={id}
                                        onClick={() => {
                                            setSelectedValue(data);
                                            setValue(data);
                                            setSearchContent(data);
                                        }}
                                        style={{
                                            padding: '7px 13px',
                                            color: 'lime',
                                            '&:hover': {
                                                backgroundColor: '#E5E5E5'
                                            }
                                        }}
                                    >
                                        {data}
                                    </div>
                                );
                        })
                    }{' '}
                </div>
            )}
        </div>
    );
}

export default Selector;
