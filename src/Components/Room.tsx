interface propTypes {
    className: string,
    id: string,
    transform: string,
    d: string,
}

const Room = ({ className, id, transform, d }: propTypes) => {
    return (
        <>
            {transform === '' ? (
                <path
                    className={className}
                    id={id}
                    d={d}
                ></path>
            ) : (
                <path
                    className={className}
                    id={id}
                    transform={transform}
                    d={d}
                ></path>
            )}
        </>
    )
}

export default Room;