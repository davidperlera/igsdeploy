import { Close } from '@mui/icons-material'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'
import { Avatar, IconButton, Input, InputAdornment, SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import searchIcon from 'assets/lupa.png'
import Routes from 'enums/Routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationService from 'services/NotificationService'
import { logOut } from 'services/authService'
import { getAvatarUrl, getUsername, updateAvatar } from 'services/userService'

interface Props {
  onSearch?: (text: string) => void;
  hideSearch?: boolean;
}

const hiddenInputStyles: SxProps<Theme> = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '1px',
}

const Navbar = ({ onSearch, hideSearch }: Props) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchAvatar()
  }, [])

  const fetchAvatar = async (url?: string) => {
    setAvatar(await getAvatarUrl(url))
  }

  const handleLogOut = () => {
    logOut()
    window.location.reload()
  }

  const handleAvatarUpload = async (event: any) => {
    try {
      const file = event.target.files![0];
      const updatedModel = await updateAvatar(file);
      fetchAvatar(updatedModel.avatar);
      NotificationService.success('Avatar image updated successfully');
    } catch {
      NotificationService.error('Error updating avatar');
    }
  }

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(value);
  }

  const navigateHome = () => {
    navigate(Routes.HOME);
  }

  useEffect(() => {
    if (onSearch) {
      onSearch(search);
    }
  }, [search])

  return (
    <Box className="flex flex-wrap justify-between items-center bg-slate-50 border-solid border-b-2 border-gray-800 ">
      <Typography className="order-1 !ml-8 !text-xl cursor-pointer" onClick={navigateHome} >KANBAN ZEN</Typography>
      {!hideSearch &&
        <TextField
          variant="outlined"
          placeholder="try search a kanban board"
          className=" w-[100%] !mx-[6%] sm:mx-auto order-3 sm:order-2 m-auto !my-2 sm:!my-3 sm:w-1/3 bg-[#FFFFFF] [&>*]:!border-none  [&>*]:!rounded-lg"
          size="small"
          onChange={handleOnSearch}
          value={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={searchIcon}
                  alt="search icon"
                  style={{ width: '1.3rem', height: '1.3rem' }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              !!search ? (<InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={() => setSearch('')} edge="end">
                  <Close sx={{ fill: 'black' }} />
                </IconButton>
              </InputAdornment>) : (<></>)
            ),
          }}
        />}
      <Dropdown>
        <MenuButton className="order-2 sm:order-3 flex justify between items-center md:!mr-8 !border-none">
          <Box className="flex justify between items-center">
            <Typography className="hidden sm:inline-block !mr-4">{getUsername()}</Typography>
            <Avatar className=" !ml-2" alt="user avatar" src={avatar} />
          </Box>
        </MenuButton>
        <Menu keepMounted>
          <MenuItem className='block sm:!hidden' disabled>{getUsername()}</MenuItem>
          <MenuItem component={'label'}>
            Change Avatar
            <Input type='file' inputProps={{ accept: 'image/*' }} sx={hiddenInputStyles} onChange={handleAvatarUpload} />
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  )
}

export default Navbar