import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FavoritesProvider } from './Favorites';

export default function Layout({ children }) {
  const pathname = usePathname();
  
  // Determine active link for styling
  const isActive = (path) => pathname === path ? { color: '#3b82f6', fontWeight: 'bold' } : {};

  return (
    <FavoritesProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ 
          backgroundColor: '#1e40af', 
          color: 'white', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>
          <div style={{ 
            container: 'max-width: 1200px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link href="/" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: 'white',
              textDecoration: 'none'
            }}>
              Product Showcase
            </Link>
            
            <nav>
              <div style={{ 
                display: 'flex',
                gap: '1.5rem',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <Link 
                  href="/" 
                  style={{ 
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    ...isActive('/')
                  }}
                >
                  Home
                </Link>
                <Link 
                  href="/contact" 
                  style={{ 
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    ...isActive('/contact')
                  }}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main style={{ 
          container: 'max-width: 1200px',
          margin: '0 auto',
          padding: '2rem',
          flexGrow: 1
        }}>
          {children}
        </main>

        <footer style={{ 
          backgroundColor: '#1f2937', 
          color: 'white', 
          padding: '1.5rem 0',
          marginTop: '2rem'
        }}>
          <div style={{ 
            container: 'max-width: 1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <p>© {new Date().getFullYear()} Product Showcase. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </FavoritesProvider>
  );
}