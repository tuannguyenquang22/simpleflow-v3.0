import os


def make_sure_static_dir_exists(base_dir: str = None) -> str:
    """
    Ensure the 'static' directory exists within the given base directory.
    If no base_dir is provided, use the current working directory.
    
    Returns:
        The absolute path to the static directory.
    """
    if base_dir is None:
        base_dir = os.getcwd()

    static_dir = os.path.join(base_dir, 'static')

    if not os.path.exists(static_dir):
        os.makedirs(static_dir)
        print(f"Created static directory: {static_dir}")
    else:
        print(f"Static directory already exists: {static_dir}")

    return static_dir
