﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product.App.Models;

namespace Product.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public UsersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet("signin")]
        public async Task<IActionResult> SignIn(string email, string password)
        {
            try
            {
                var user = await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
                if(user == null)
                {
                    return Ok(new { msg = "No user" });
                } else
                {
                    var passwordVerifiedUser = await _context.Users.Where(user => user.Email == email && user.Password == password).FirstOrDefaultAsync();
                    if(passwordVerifiedUser == null)
                    {
                        return Ok(new { msg = "Password invalid" });
                    } else
                    {
                        return Ok(new { msg = "Success", user = user });
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("signup")]
        public async Task<ActionResult<User>> SignUp(User user)
        {

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpGet("checking_email")]
        public async Task<IActionResult> CheckingEmail(string email)
        {
            try
            {
                var user = await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
                if (user == null)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
