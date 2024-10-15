import { useState } from "react";
import { Menu, X, User, Settings, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { webIcon } from "@/constants/web-constants";

import { AuthStatus, useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authStatus } = useAuthStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className='bg-background shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link to='/'>
              <img src={webIcon} alt='' className='w-28 h-22' />
            </Link>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <Button
              variant='ghost'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='h-6 w-6' aria-hidden='true' />
              )}
            </Button>
          </div>
          <nav className='hidden md:flex space-x-10'>
            {["Inicio", "Acerca de nosotoros", "Servicios", "Contactanos"].map(
              (item) => (
                <a
                  key={item}
                  href='#'
                  className='text-base font-medium text-muted-foreground hover:text-primary transition duration-300 ease-in-out'
                >
                  {item}
                </a>
              )
            )}
          </nav>
          <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
            {/* <Button
              onClick={() => {
                navigate("ingreso");
              }}
              className='ml-8 whitespace-nowrap'
            >
              Iniciar sesion
            </Button> */}
            {authStatus === AuthStatus.UNAUTHENTICATED ? (
              <Button
                onClick={() => {
                  navigate("ingreso");
                }}
                className='ml-8 whitespace-nowrap'
              >
                Iniciar sesion
              </Button>
            ) : (
              <div className='flex items-center space-x-4'>
                {/* Botón para Notificaciones */}
                {/* <div className='group relative h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary transition-colors duration-300 cursor-pointer'>
                  <Bell className='h-5 w-5 text-gray-600 group-hover:text-white' />
                </div> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='relative h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary transition-colors duration-300 cursor-pointer group'
                    >
                      <Bell className='h-5 w-5 text-gray-600 group-hover:text-white' />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                    <h3>contenido xd</h3>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/*  */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='relative h-8 w-8 rounded-full'
                    >
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src='/placeholder-avatar.jpg'
                          alt='User avatar'
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={() => {
                        navigate("/mi-cuenta");
                      }}
                    >
                      <User className='mr-2 h-4 w-4' />
                      <span>Mi perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Settings className='mr-2 h-4 w-4' />
                      <span>Ajustes</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={logout}
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Cerrar sesíon</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-background divide-y-2 divide-muted'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-2xl font-bold text-primary'>Logo</span>
                </div>
                <div className='-mr-2'>
                  <Button
                    variant='ghost'
                    onClick={() => setIsMenuOpen(false)}
                    aria-label='Close menu'
                  >
                    <X className='h-6 w-6' aria-hidden='true' />
                  </Button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid gap-y-8'>
                  {["Home", "About", "Services", "Contact"].map((item) => (
                    <a
                      key={item}
                      href='#'
                      className='text-base font-medium text-muted-foreground hover:text-primary transition duration-300 ease-in-out'
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              {authStatus === AuthStatus.UNAUTHENTICATED ? (
                <Button className='w-full'>Get Started</Button>
              ) : (
                <Button className='w-full'>Hola gente </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

/* export const Header = withAuth(HeaderComponent); */
